#!groovy

@Library('blockr-jenkins-lib') _

String repo = 'blockr-logger'

Map settings = [
    sonar_key: 'blockr-logger',
    skip_tests: false,
    source_folder: 'src/',
    archive_folders: ['dist/']
]

tsBuildAndPublish(repo, settings)