#!/bin/bash

gradle="./gradlew $@"
gradleBuild=""
gradleBuildOptions="--build-cache --configure-on-demand --no-daemon "

echo -e "***********************************************"
echo -e "Gradle build started at `date`"
echo -e "***********************************************"

gradleBuild="$gradleBuild downloadDependencies --parallel --refresh-dependencies "

tasks="$gradle $gradleBuildOptions $gradleBuild"
echo -e "***************************************************************************************"
echo $tasks
echo -e "***************************************************************************************"

waitloop="while sleep 9m; do echo -e '\n=====[ Gradle build is still running ]====='; done &"
eval $waitloop
waitRetVal=$?

echo 'Running command...'
eval $tasks
retVal=$?

echo -e "***************************************************************************************"
echo -e "Gradle build finished at `date` with exit code $retVal"
echo -e "***************************************************************************************"

if [ $retVal == 0 ]; then
    echo "Gradle build finished successfully."
    exit 0
else
    echo "Gradle build did NOT finish successfully."
    exit $retVal
fi
