import React from "react";

export type menuDetails = {
    //id: number;
    dish_Name: string;
    dish_Discription: string;
    course_Type: string;
    price: number;
}

/* Purpose of the RootStackParamList:
1. defines the parmateres that can be passed to different screens withing the navigation stack

2. Although we are not passing parameters through screens in this app, it provides structure and type safety (preventing potential errors)
*/

export type RootStackParamList = {
    
    Home: {dish_Name :string; 
        dish_Discription: string;
        course_Type: string;
        price: string;}; //parameter that screen 2 is structured to receive
        Add: undefined;
    }