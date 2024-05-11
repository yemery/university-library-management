import { Button, Dropdown } from "flowbite-react";
import { Flowbite } from 'flowbite-react';

const DropDownItems = () => {
    const customTheme = {
        button: {
          color: {
            primary: 'bg-blue-500 hover:bg-red-600',
          },
        },
      };
  return (
   <>
   <Flowbite theme={{ theme: customTheme }}>
      <Button color="primary">Click me</Button>
    </Flowbite>
   <Flowbite theme={{ theme: customTheme }}>
      <Dropdown label="Dropdown">
      <Dropdown.Item onClick={() => alert('Dashboard!')}>Dashboard</Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Settings!')}>Settings</Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Earnings!')}>Earnings</Dropdown.Item>
      <Dropdown.Item onClick={() => alert('Sign out!')}>Sign out</Dropdown.Item>
    </Dropdown> 
    </Flowbite>
   
</>
  )
}

export default DropDownItems