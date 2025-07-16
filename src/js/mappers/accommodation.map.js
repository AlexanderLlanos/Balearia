export const accommodationMap = {
  toDomain: (response) => {
    return {
      passenger: {
        adult: {
          quantity: response.passenger_data.passengers.adults,
          emissionCost: response.emission_costs.adult_cost,
          emissionCostResident: response.emission_costs.adult_cost_resident,
        },
        seniors60: {
          quantity: response.passenger_data.passengers.seniors60,
          emissionCost: response.emission_costs.senior60_cost,
          emissionCostResident: response.emission_costs.senior60_cost_resident,
        },
        children: {
          quantity: response.passenger_data.passengers.children,
          emissionCost: response.emission_costs.child_cost,
          emissionCostResident: response.emission_costs.child_cost_resident,
        },
        babies: {
          quantity: response.passenger_data.passengers.babies,
          emissionCost: response.emission_costs.baby_cost,
          emissionCostResident: response.emission_costs.baby_cost_resident,
        },
        babies12: {
          quantity: response.passenger_data.passengers.babies12,
          emissionCost: response.emission_costs.baby12_cost,
          emissionCostResident: response.emission_costs.baby12_cost_resident,
        },
        vehicles: response.passenger_data.vehicles.map((vehicle) => {
          return {
            model: vehicle.model,
            emissionCost: response.emission_costs.vehicle_cost,
            emissionCostResident: response.emission_costs.vehicle_cost_resident,
          };
        }),
        tows: response.passenger_data.tows.map((tow) => {
          return {
            model: tow.model,
            emissionCost: response.emission_costs.tow_cost,
            emissionCostResident: response.emission_costs.tow_cost_resident,
          };
        }),
        extras: {
          outbound: response.routes.outbound.map((value) => {
            return {
              quantity: value.quantity,
              type: value.type,
              id: value.id,
              name: value.name,
              price: value.price,
            };
          }),
          inbound: response.routes.inbound.map((value) => {
            return {
              quantity: value.quantity,
              type: value.type,
              id: value.id,
              name: value.name,
              price: value.price,
            };
          }),
        },
      },
      routes: {
        outbound: response.routes.outbound.map((value) => {
          return {
            id: value.id,
            tariffs: value.tariffs.map((tariff) => {
              return {
                id: tariff.id,
                type: tariff.type,

                adultPrice: tariff.adult_price,
                adultPriceResident: tariff.adult_price_resident,

                senior60Price: tariff.senior60_price,
                senior60PriceResident: tariff.senior60_price_resident,

                childPrice: tariff.child_price,
                childPriceResident: tariff.child_price_resident,

                babyPrice: tariff.baby_price,
                babyPriceResident: tariff.baby_price_resident,

                baby12Price: tariff.baby12_price,
                baby12PriceResident: tariff.baby12_price_resident,

                vehiclePrice: tariff.vehicle_price,
                vehiclePriceResident: tariff.vehicle_price_resident,

                towPrice: tariff.tow_price,
                towPriceResident: tariff.tow_price_resident,
              };
            }),
          };
        }),
        inbound: response.routes.inbound.map((value) => {
          return {
            id: value.id,
            tariffs: value.tariffs.map((tariff) => {
              return {
                id: tariff.id,
                type: tariff.type,

                adultPrice: tariff.adult_price,
                adultPriceResident: tariff.adult_price_resident,

                senior60Price: tariff.senior60_price,
                senior60PriceResident: tariff.senior60_price_resident,

                childPrice: tariff.child_price,
                childPriceResident: tariff.child_price_resident,

                babyPrice: tariff.baby_price,
                babyPriceResident: tariff.baby_price_resident,

                baby12Price: tariff.baby12_price,
                baby12PriceResident: tariff.baby12_price_resident,

                vehiclePrice: tariff.vehicle_price,
                vehiclePriceResident: tariff.vehicle_price_resident,

                towPrice: tariff.tow_price,
                towPriceResident: tariff.tow_price_resident,
              };
            }),
          };
        }),
      },
    };
  },
};
