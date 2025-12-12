.ONESHELL:

.PHONY: clean install prod all

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

install:
	python -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt

dev: 
	. venv/bin/activate
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

prod:
	. venv/bin/activate
	uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

all: clean install prod