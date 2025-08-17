from setuptools import setup, find_packages

setup(
    name="linkkora",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "Flask==3.0.0",
        "Flask-CORS==4.0.0",
        "pandas==2.0.3",
        "openpyxl==3.1.2",
        "gunicorn==21.2.0",
        "psycopg2-binary==2.9.9",
        "python-dotenv==1.0.0",
    ],
    python_requires=">=3.8",
)
