import { Button } from '../Button';
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useArgs } from "@storybook/preview-api";
import { Map } from './Map';
import { mapDeclare } from './utils/map';
 import   { AutoComplete } from './AutoComplete';
import { useState } from 'react';
//  import { AutoComplete } from './AutoComplete';
const meta: Meta<typeof Map> = {
    title:'Maps/Map',
  component: Map,
  tags:["autodocs"],
  args:{
    // mapOnly:fn(),
    // streetOnly:fn(),
    // AutoComplete:fn(),
    // Dragable:fn()
  }
};

export default meta;
type Story = StoryObj<typeof Map>;
 
export const Primary = {
    // render: <MapView titlssse="oke boss"  />,
     render:function Component(args:any) {
      const [, setArgs] = useArgs();
      const handleClick = () => {
        setArgs({ ...args, mapView: !args.mapView });
      };
      return (
        <div>
      
          <AutoComplete  {...args}   />
          <Button size="small" onClick={handleClick} label="autocomplete" />
          <Button size="small" onClick={()=>setArgs({ ...args, autoComplete: !args.autoComplete })} label="autocomplete" />
          <Button size="small" onClick={()=>setArgs({ ...args, dragable: !args.dragable })} label="dragable" />
          <Button size="small" onClick={()=>setArgs({ ...args, streetView: !args.streetView })} label="streetview" />
        </div>
      );
    },
  args:{
   
    maps : async()=>{
        await mapDeclare({
          lat:12,
          lng:12
        },"") 
    },
     label:"buto",
     mapId:"buto",
    mapView:true,
    autoComplete:true,
    dragable:false,
    streetView:false
  }
};
export const Dragable = {
    // render: <MapView titlssse="oke boss"  />,
     render:function Component(args:any) {
      const [, setArgs] = useArgs();
      const handleClick = () => {
        setArgs({ ...args, mapView: !args.mapView });
      };
      return (
        <div>
      
          <AutoComplete  {...args}   />
           
          <Button size="small" onClick={()=>setArgs({ ...args, dragable: !args.dragable })} label="dragable" />
         
        </div>
      );
    },
  args:{
   
    maps : async()=>{
        await mapDeclare({
          lat:12,
          lng:12
        },"") 
    },
     label:"buto",
     mapId:"buto",
    mapView:false,
   
    dragable:false,
    
  }
};
export const Autocomplete = {
    // render: <MapView titlssse="oke boss"  />,
     render:function Component(args:any) {
      const [, setArgs] = useArgs();
      const handleClick = () => {
        setArgs({ ...args, mapView: !args.mapView });
      };
      return (
        <div>
      
          <AutoComplete  {...args}   />
          <Button size="small" onClick={handleClick} label="autocomplete" />
           
        </div>
      );
    },
  args:{
   
    maps : async()=>{
        await mapDeclare({
          lat:12,
          lng:12
        },"") 
    },
     label:"buto",
     mapId:"buto",
    mapView:true,
    autoComplete:true,
     
  }
};
export const streetOnly = {
    // render: <MapView titlssse="oke boss"  />,
     render:function Component(args:any) {
      const [, setArgs] = useArgs();
      
      return (
        <div>
      
          <AutoComplete  {...args}   />
         
          <Button size="small" onClick={()=>setArgs({ ...args, streetView: !args.streetView })} label="streetview" />
        </div>
      );
    },
  args:{
   
    maps : async()=>{
        await mapDeclare({
          lat:12,
          lng:12
        },"") 
    },
     label:"buto",
     mapId:"buto",
    mapView:true,
    
    streetView:false
  }
};
export const mapOnly = {
    // render: <MapView titlssse="oke boss"  />,
     render:function Component(args:any) {
      const [, setArgs] = useArgs();
      const handleClick = () => {
        setArgs({ ...args, mapView: !args.mapView });
      };
      return (
        <div>
      
          <AutoComplete  {...args}   />
          <Button size="small" onClick={handleClick} label="mapview" />
          
        </div>
      );
    },
  args:{
   
    maps : async()=>{
        await mapDeclare({
          lat:12,
          lng:12
        },"") 
    },
     label:"buto",
     mapId:"buto",
    mapView:true,
     
  }
};