# AsAR
assessment-aware retrieval and ranking system

works for Python 3.13.5
then set up your virtual env
```
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
```

store course and its module descriptions as a json file in `data` folder.
run `scripts/vectorize.py` to create vector representations of the course and module descriptions.
run `scripts/retrieve.py` to retrieve relevant courses and modules based on a query.

for running the client,
```
cd client
npm install
npm start
```
