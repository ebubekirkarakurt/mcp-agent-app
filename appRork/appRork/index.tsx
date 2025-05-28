import React, { useEffect, useState } from 'react';
              {searchCity ? `Getting weather for ${searchCity}...` : 'Getting your weather...'}
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error === 'location' 
                ? "Please enable location services or search for a city."
                : error}
            </Text>
          </View>
        ) : (
          <>
            {location && <LocationInfo location={location} />}
            {weather && <WeatherCard weather={weather} />}
            <AIWeatherInsight 
              insight={aiInsight} 
              loading={aiLoading} 
              error={aiError} 
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  locationButtonText: {
    color: colors.primary,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});