properties([pipelineTriggers([githubPush()])])

pipeline {
  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 30, unit: 'MINUTES')
  }

  agent {
    kubernetes {
      label 'worker-slackin'
      inheritFrom 'default'

      containerTemplates([
        containerTemplate(name: 'helm', image: "lachlanevenson/k8s-helm:v2.17.0", command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'docker', image: 'docker:18', resourceRequestCpu: '1', resourceRequestMemory: '2Gi', command: 'cat', ttyEnabled: true)
      ])
    }
  }

  environment {
    ORG      = 'flowcommerce'
  }

  stages {
    stage('Checkout') {
      steps {
        checkoutWithTags scm

        script {
          VERSION = new flowSemver().calculateSemver() //requires checkout
        }
      }
    }

    stage('Commit SemVer tag') {
      when { branch 'main' }
      steps {
        script {
          new flowSemver().commitSemver(VERSION)
        }
      }
    }

    stage('Build and push docker image release') {
      when { branch 'main' }
      steps {
        container('docker') {
          script {
            semver = VERSION.printable()
            
            docker.withRegistry('https://index.docker.io/v1/', 'jenkins-dockerhub') {
              db = docker.build("$ORG/slackin:$semver", '--network=host -f Dockerfile .')
              db.push()
            }
            
          }
        }
      }
    }

    stage('Deploy Helm chart') {
      when { branch 'main' }
      steps {
        container('helm') {
          script {
          
            new helmCommonDeploy().deploy('slackin', 'apicollective', VERSION.printable(), 420)
          
          }
        }
      }
    }
  }
}
