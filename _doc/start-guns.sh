#!/bin/sh
echo "  =====关闭Guns应用======"
PROCESS=`ps -ef | grep java | grep -v grep | grep guns.jar | awk '{print $2}'`
for i in $PROCESS
do
  echo "Kill the $1 process [ $i ]"
  kill -9 $i
done
echo "  =====关闭Guns应用======"
nohup java -Xms1024M -Xmx1024M -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=512M -jar guns.jar --spring.profiles.active=local > guns.out &
tail -f guns.out