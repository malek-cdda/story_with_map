"use client"
import React, { useState } from 'react';
import { AutoComplete } from './AutoComplete';

export const Map = () => {
    const [mapView, setMapView] = useState<boolean>(false);
    return (
        <div>
            <AutoComplete  />

        </div>
    );
};

