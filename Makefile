app=task-list-frontend
.PHONY: build

build :
	npm run build
	docker build -t ${app} .

app :
	docker run --name ${app} -p 80:80 -d ${app}

stop :
	docker stop ${app}

all : build app

cleanup : stop
	docker rm ${app}
