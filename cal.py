import tabpy
import plotly.express as px
import pandas as pd
import tabpy_client

def scatter_plot(data):
   fig = px.scatter(data, x='x', y='y')
   return fig.to_dict()

client = tabpy_client.Client('http://localhost:9004')

client.deploy('scatter_plot', scatter_plot, 'Creates a scatter plot using Plotly Express')
