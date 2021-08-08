app=task-list-frontend
.PHONY: build

build :
	npm run build
	docker build -t ${app} .

app :
	docker run --name ${app} -d ${app}

stop :
	docker stop ${app}

all : build app

cleanup : stop
	docker rm ${app}
