web: sshpass -e ssh -gnNTf -L 8000:10.110.6.35:8000 -o StrictHostKeyChecking=no $wsuuser & waitress-serve --port=$PORT wsgi:app