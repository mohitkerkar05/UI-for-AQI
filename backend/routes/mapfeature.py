import folium
import pandas as pd
import numpy as np
from folium.plugins import MarkerCluster

def create_aqi_map():
    # Create a base map with light blue theme
    m = folium.Map(
        location=[39.9042, 116.4074],  # Default center (Beijing)
        zoom_start=4,
        tiles=None  # We'll add custom tiles
    )
    
    # Add light blue themed tile layers
    folium.TileLayer(
        'CartoDB positron',  # Light theme
        name='Light Theme',
        attr='CartoDB'
    ).add_to(m)
    
    folium.TileLayer(
        'Stamen Terrain',
        name='Terrain',
        attr='Stamen'
    ).add_to(m)
    
    # Add water color tile layer for light blue theme
    folium.TileLayer(
        'Stamen Toner',
        name='Water Color',
        attr='Stamen',
        tiles='Stamen Toner'
    ).add_to(m)
    
    # Sample AQI data (in real application, you'd load this from an API or database)
    aqi_data = [
        {'city': 'Beijing', 'lat': 39.9042, 'lon': 116.4074, 'aqi': 156, 'quality': 'Unhealthy'},
        {'city': 'Shanghai', 'lat': 31.2304, 'lon': 121.4737, 'aqi': 89, 'quality': 'Moderate'},
        {'city': 'Guangzhou', 'lat': 23.1291, 'lon': 113.2644, 'aqi': 67, 'quality': 'Moderate'},
        {'city': 'Shenzhen', 'lat': 22.3193, 'lon': 114.1694, 'aqi': 45, 'quality': 'Good'},
        {'city': 'Chengdu', 'lat': 30.5728, 'lon': 104.0668, 'aqi': 123, 'quality': 'Unhealthy for Sensitive Groups'},
        {'city': 'Xi\'an', 'lat': 34.3416, 'lon': 108.9398, 'aqi': 178, 'quality': 'Unhealthy'},
        {'city': 'Hangzhou', 'lat': 30.2741, 'lon': 120.1551, 'aqi': 56, 'quality': 'Moderate'},
        {'city': 'Nanjing', 'lat': 32.0603, 'lon': 118.7969, 'aqi': 92, 'quality': 'Moderate'},
        {'city': 'Wuhan', 'lat': 30.5928, 'lon': 114.3055, 'aqi': 134, 'quality': 'Unhealthy for Sensitive Groups'},
        {'city': 'Tianjin', 'lat': 39.3434, 'lon': 117.3616, 'aqi': 167, 'quality': 'Unhealthy'}
    ]
    
    # Convert to DataFrame
    df = pd.DataFrame(aqi_data)
    
    # Function to get color based on AQI
    def get_aqi_color(aqi):
        if aqi <= 50:
            return 'green'
        elif aqi <= 100:
            return 'yellow'
        elif aqi <= 150:
            return 'orange'
        elif aqi <= 200:
            return 'red'
        elif aqi <= 300:
            return 'purple'
        else:
            return 'maroon'
    
    # Function to get marker icon color
    def get_marker_color(aqi):
        if aqi <= 50:
            return 'lightgreen'
        elif aqi <= 100:
            return 'lightyellow'
        elif aqi <= 150:
            return 'lightorange'
        elif aqi <= 200:
            return 'lightred'
        elif aqi <= 300:
            return 'lightpurple'
        else:
            return 'lightgray'
    
    # Create marker cluster
    marker_cluster = MarkerCluster(
        name="AQI Stations",
        options={
            'maxClusterRadius': 50,
            'disableClusteringAtZoom': 8
        }
    ).add_to(m)
    
    # Add markers for each city
    for idx, row in df.iterrows():
        # Create popup content
        popup_content = f"""
        <div style="font-family: Arial, sans-serif; padding: 10px;">
            <h3 style="color: #2c3e50; margin-bottom: 10px;">{row['city']}</h3>
            <div style="background-color: {get_aqi_color(row['aqi'])}; 
                       padding: 8px; 
                       border-radius: 5px; 
                       color: white; 
                       font-weight: bold;
                       text-align: center;">
                AQI: {row['aqi']} - {row['quality']}
            </div>
            <p style="margin-top: 10px; color: #34495e;">
                <strong>Coordinates:</strong><br>
                Lat: {row['lat']:.4f}<br>
                Lon: {row['lon']:.4f}
            </p>
        </div>
        """
        
        # Create marker with custom icon
        folium.Marker(
            location=[row['lat'], row['lon']],
            popup=folium.Popup(popup_content, max_width=300),
            tooltip=f"{row['city']} - AQI: {row['aqi']}",
            icon=folium.Icon(
                color=get_marker_color(row['aqi']),
                icon='info-sign',
                prefix='fa'  # Font Awesome icons
            )
        ).add_to(marker_cluster)
    
    # Add heatmap layer for AQI visualization
    from folium.plugins import HeatMap
    
    heat_data = [[row['lat'], row['lon'], row['aqi']] for idx, row in df.iterrows()]
    
    HeatMap(
        heat_data,
        name='AQI Heatmap',
        min_opacity=0.3,
        max_zoom=10,
        radius=25,
        blur=15,
        gradient={
            0.2: 'lightblue',
            0.4: 'lightgreen', 
            0.6: 'yellow',
            0.8: 'orange',
            1.0: 'red'
        }
    ).add_to(m)
    
    # Add AQI legend
    legend_html = '''
    <div style="position: fixed; 
                top: 10px; 
                right: 10px; 
                width: 200px; 
                height: 300px; 
                background-color: rgba(255,255,255,0.9);
                border: 2px solid lightblue;
                border-radius: 10px;
                z-index: 9999; 
                font-size: 12px;
                padding: 15px;
                font-family: Arial, sans-serif;">
    
    <h4 style="color: #3498db; margin-top: 0; text-align: center;">AQI Scale</h4>
    <div style="background: linear-gradient(to bottom, green, yellow, orange, red, purple, maroon); 
                height: 150px; 
                width: 30px; 
                float: left; 
                margin-right: 10px;"></div>
    <div style="line-height: 25px;">
        <span style="color: green;">0-50: Good</span><br>
        <span style="color: yellow;">51-100: Moderate</span><br>
        <span style="color: orange;">101-150: Unhealthy for Sensitive</span><br>
        <span style="color: red;">151-200: Unhealthy</span><br>
        <span style="color: purple;">201-300: Very Unhealthy</span><br>
        <span style="color: maroon;">301+: Hazardous</span>
    </div>
    </div>
    '''
    
    m.get_root().html.add_child(folium.Element(legend_html))
    
    # Add layer control
    folium.LayerControl(
        position='topleft',
        collapsed=False
    ).add_to(m)
    
    # Add custom CSS for light blue theme
    custom_css = """
    <style>
        .folium-map {
            background-color: #e8f4f8 !important;
        }
        .leaflet-popup-content-wrapper {
            background-color: #f8fdff;
            border: 2px solid #a8d8f0;
            border-radius: 10px;
        }
        .leaflet-popup-tip {
            background: #a8d8f0;
        }
    </style>
    """
    m.get_root().html.add_child(folium.Element(custom_css))
    
    return m

# Create and display the map
aqi_map = create_aqi_map()

# Save to HTML file
aqi_map.save('aqi_interactive_map.html')

# Display in Jupyter notebook (if running in Jupyter)
# aqi_map

print("Interactive AQI map created successfully!")
print("Map saved as 'aqi_interactive_map.html'")