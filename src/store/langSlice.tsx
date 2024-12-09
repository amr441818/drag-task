import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type langCurrncy = {
  language: string;
  currency: string;
  offerPrice:number
  offerCurrency:string
};

const initialState: langCurrncy = {
  language: "ar",
  currency: "EGP",
  offerPrice:0,
  offerCurrency:""
};
const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state: langCurrncy, action: PayloadAction<any>) => {
      
      state.language = action?.payload;
    },
    setCurrency: (state: langCurrncy, action: PayloadAction<any>) => {
      
      state.currency = action?.payload;
    },
    setOfferPrice: (state: langCurrncy, action: PayloadAction<any>) => {
      
      state.offerPrice = action?.payload;
    },
    setOfferCurrency: (state: langCurrncy, action: PayloadAction<any>) => {
      
      state.offerCurrency = action?.payload;
    },
  },
});

export const langActions = langSlice.actions;
export default langSlice.reducer;