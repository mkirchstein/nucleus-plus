#!/usr/bin/env groovy
@Library('jenkins-pipeline-library') _
 
// pipeline {
//   agent {
//     label "generic"
//   }
//   options {
//     ansiColor colorMapName: 'XTerm'
//   }
//   stages {
//     stage("Display ENV data") {
//       steps {
//         printEnvSorted ()
//       }
//     }
//   }
// }

pipeline {
  agent none
  options {
    ansiColor colorMapName: 'XTerm'
    timestamps()
  }
  stages {
    stage('Setup Build Environment') {
      agent { label 'generic' }
      steps {
        script {
          env.PACKAGE_NAME = '@earnest/nucleus-plus'
          env.VERSION = versionFromPackageJson('package.json', { packageVersionOnly = true })
          env.TARBALL_NAME = "earnest-nucleus-plus-v${env.VERSION}.tgz"
        }
        printEnvSorted()
      }
    }

    stage('Build') {
      agent { label 'generic' }
      steps {
        // Generate tarball
        sh "env UID=`id -u` GID=`id -g` docker-compose run nucleusplus bash -c \"NODE_ENV=production yarn run build && yarn pack --install-if-needed --out %s-%v.tgz\""
        stash name: 'tarball-stash', includes: env.TARBALL_NAME
      }
      post {
        cleanup {
          cleanAll()
        }
      }
    }
    stage('Inspect') {
      agent { label 'generic' }
      when {
        not {
          branch 'main'
        }
        beforeAgent true
      }
      steps {
        prepareDockerEnv(true)
        unstash name: 'tarball-stash'
        sh "tar -tzf ${TARBALL_NAME} | sort"
        archiveArtifacts artifacts: env.TARBALL_NAME, fingerprint: true
      }
      post {
        cleanup {
          cleanAll()
        }
      }
    }
    stage('Publish') {
      agent { label 'generic' }
      when {
        branch 'main'
        beforeAgent true
      }
      steps {
        prepareDockerEnv(true)
        unstash name: 'tarball-stash'
        // Publish to NPM.js using safe-npm-push
        prepareNpmEnv()
        npmPush(env.TARBALL_NAME)
      }
      post {
        cleanup {
          cleanAll()
        }
      }
    }
  }
}
