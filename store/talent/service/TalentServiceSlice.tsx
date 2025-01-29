"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TalentServiceState {
  service: {
    experience_years: string;
    service_type: string;
    service_desc: string;
    rate_per_hour: number;
    availability: {
      monday: {
        start: string;
        end: string;
      };
      tuesday: {
        start: string;
        end: string;
      };
      wednesday: {
        start: string;
        end: string;
      };
      thursday: {
        start: string;
        end: string;
      };
      friday: {
        start: string;
        end: string;
      };
      saturday: {
        start: string;
        end: string;
      };
      sunday: {
        start: string;
        end: string;
      };
    };
    address: string;
  };
}

export interface RootStateTalentService {
  service: TalentServiceState;
  talentProfile: any // Nested state structure
}

// Initial state
const initialState: TalentServiceState = {
  service: {
    experience_years: "",
    service_type: "",
    service_desc: "",
    rate_per_hour: 0,
    availability: {
      monday: {
        start: "",
        end: "",
      },
      tuesday: {
        start: "",
        end: "",
      },
      wednesday: {
        start: "",
        end: "",
      },
      thursday: {
        start: "",
        end: "",
      },
      friday: {
        start: "",
        end: "",
      },
      saturday: {
        start: "",
        end: "",
      },
      sunday: {
        start: "",
        end: "",
      },
    },
    address: "",
  },
};

// Redux slice for Talent Service
const talentServiceSlice = createSlice({
  name: "TalentService",
  initialState,
  reducers: {
    /**
     * Update the bank details.
     * @param state - Current state.
     * @param action - Payload containing the updated bank details.
     */
    setService: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.service = action.payload;
    },
    // setService(state, action) {
    //   // Find the index of the object with matching service_type
    //   const index = state.findIndex(
    //     (service) => service.service_type === action.payload.service_type
    //   );

    //   // Update the object if a match is found
    //   if (index !== -1) {
    //     state[index] = { ...state[index], ...action.payload };
    //   } else {
    //     // Optional: Handle cases where the service_type doesn't exist
    //     console.warn("No matching service_type found.");
    //   }
    // },
  },
});

// Export actions and reducer
export const { setService } =
  talentServiceSlice.actions;
export default talentServiceSlice.reducer;


