dev-start:
	(cd ./backend/ && pnpm run start:dev)
#WARN: will drop db
dev-db: 
	bash ./backend/src/scripts/start-db.sh
