#!/bin/bash

set -ex

#判断传参数量
#第一个参数为仓库分支或标签branch_or_tag
if [[ $# < 1 ]]; then
    echo 'params num error!'
    exit 1
fi

#写版本、时间到.deploy-version文件，方便排查问题时确认线上代码发布版本及时间
version_file='.deploy-version'
echo $1@$(date '+%Y-%m-%d %H:%M:%S') > $version_file

#配置.deploy-exclude.list文件，内容为忽略文件或目录一般要包含.git，发布脚本会自动往这个文件添加.git，可根据自己仓库需要配置这个文件
exclude_file='.deploy-exclude.list'
#比如忽略backend目录，则：echo 'backend' >> $exclude_file
