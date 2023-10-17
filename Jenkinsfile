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
      inheritFrom 'kaniko-slim'
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
        container('kaniko') {
          script {
            semver = VERSION.printable()

            sh """
              /kaniko/executor -f `pwd`/Dockerfile -c `pwd` \
              --snapshot-mode=redo --use-new-run  \
              --destination ${env.ORG}/slackin:$semver
            """ 
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
