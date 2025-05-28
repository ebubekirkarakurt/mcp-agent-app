import { create } from 'zustand';
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      
      set({
        weather,
        location: {
          latitude: data.coord.lat,
          longitude: data.coord.lon,
          city: data.name,
          country: data.sys.country
        },
        loading: false
      });
      
      // Get AI insights after weather data is fetched
      get().getAIWeatherInsight();
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to find city', 
        loading: false 
      });
    }
  },
  
  getAIWeatherInsight: async () => {
    const { weather, location } = get();
    
    if (!weather || !location) return;
    
    set({ aiLoading: true, aiError: null });
    
    try {
      const messages = [
        {
          role: "system",
          content: "You are a helpful weather assistant. Provide a brief, friendly insight about the current weather conditions. Include practical advice based on the temperature, conditions, and time of year. Keep your response under 100 words."
        },
        {
          role: "user",
          content: `The current weather in ${location.city}, ${location.country} is: 
            - Temperature: ${Math.round(weather.temperature)}°C (feels like ${Math.round(weather.feelsLike)}°C)
            - Condition: ${weather.condition} (${weather.description})
            - Humidity: ${weather.humidity}%
            - Wind Speed: ${Math.round(weather.windSpeed)} km/h
            
            Please provide a brief insight about this weather and what people should expect or prepare for.`
        }
      ];
      
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI insights');
      }
      
      const data = await response.json();
      set({ aiInsight: data.completion, aiLoading: false });
    } catch (error) {
      console.error('Error getting AI insights:', error);
      set({ 
        aiError: 'Could not generate weather insights', 
        aiLoading: false 
      });
    }
  }
}));