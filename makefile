kind-create:
	(cd ./infrastructure/localhost && bash run.sh)
kind-reset:
	# docker-crmAll
	make kind-create
	tilt up

dev-start:
	make dev-db
	(cd ./backend/ && pnpm run start:dev)

#WARN: will drop db
dev-db: 
	(cd ./backend/ && bash ./src/scripts/start-db.sh)
