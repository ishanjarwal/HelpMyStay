export const checkIntent = (
  message: string,
  phone?: string
) => `For a whatsapp chatbot intended for small hotel owners, analyze the message given by hotel owner which is this : ${message}\nphone : ${phone}. map this message to one of the following response keywords and the data : 
         
1. View bookigs - view_bookings
2. Block rooms for service - {block_room: the_room_number}
3. Change hotel room rates - {change_rates: {new_rate: the_provided_rate}}
4. Unblock room after service - {unblock_room: the_room_number}
5. give analytics for this week - weekly_analytics
6. give analytics for this day - daily_analytics
7. Add Property - {intent: add_property, data: {name: the_property_name, address?: the_address, locationLink?: google_maps_link}}
8. View Properties -  {intent: view_properties}
9. Add Room - {intent: add_room, data: {name: the_room_name, property_name: the_property_name, price: room_price}}
10. View rooms - {intent: view_rooms, data: {property_name: the_property_name}}
Or 
11. Nothing matches : {intent: register_user, data: {phone: whatsapp number eg: whatsapp+1234567890}}




response should be json in the format : 
{
    intent: the_keyword eg: view_bookings,
    data? : the data if applicable
}

`;
