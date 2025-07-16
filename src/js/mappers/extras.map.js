export const extrasMap = {
  toDomain: (response) => {
    return {
      tripData: {
        outbound: {
          accomodation: {
            id: 0,
            name: 'Butaca Sirena',
            accId: 'butaca_sirena',
          },
          includedExtras: [
            {
              type: 'pets',
              id: 'pets_large_cage',
              quantity: 3,
            },
            {
              id: 'small_food_token',
              quantity: 1,
            },
          ],
        },
        inbound: {
          accomodation: {
            id: 0,
            name: 'Butaca Sirena',
            accId: 'butaca_sirena',
          },
          includedExtras: [
            {
              id: 'medium_food_token',
              quantity: 1,
            },
            {
              type: 'pets',
              id: 'pets_large_cage',
              quantity: 1,
            },
            {
              type: 'pets',
              id: 'pets_small_cage',
              quantity: 1,
            },
          ],
        },
      },
      reducedRate: response.extras.filter((val) => {
        return val.id === 'tarifa_reducida';
      }),
      boarding: {
        outbound: {
          priorityBoarding: response.extras.filter((val) => {
            return val.id === 'priority_boarding_outbound';
          }),
          priorityUnboarding: response.extras.filter((val) => {
            return val.id === 'priority_unboarding_outbound';
          }),
          lateUnboarding: response.extras.filter((val) => {
            return val.id === 'late_unboarding_outbound';
          }),
        },
        inbound: {
          priorityBoarding: response.extras.filter((val) => {
            return val.id === 'priority_boarding_inbound';
          }),
          priorityUnboarding: response.extras.filter((val) => {
            return val.id === 'priority_unboarding_inbound';
          }),
          lateUnboarding: response.extras.filter((val) => {
            return val.id === 'late_unboarding_inbound';
          }),
        },
      },
      travelInsurance: response.extras.filter((val) => {
        return val.id === 'travel_insurance';
      }),
      parking: response.extras.filter((val) => {
        return val.type === 'parking';
      }),
      bus: response.extras.filter((val) => {
        return val.type === 'bus';
      }),
      touristBus: response.extras.filter((val) => {
        return val.type === 'tourist-bus';
      }),
      vehicleRental: response.extras.filter((val) => {
        return val.type === 'vehicle-rental';
      }),
      foodToken: response.extras.filter((val) => {
        return val.type === 'food-token';
      }),
      food: response.extras.filter((val) => {
        return val.type === 'food';
      }),
      pets: response.extras.filter((val) => {
        return val.type === 'pets';
      }),
      wifi: response.extras.filter((val) => {
        return val.type === 'wifi';
      }),
      accomodation: response.extras.filter((val) => {
        return val.type === 'accomodation';
      }),
      example: response.extras.filter((val) => {
        return val.type === 'example';
      }),
    };
  },
};
