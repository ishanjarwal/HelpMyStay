export const checkIntent = (
  message: string,
  phone?: string
) => `For a whatsapp chatbot intended for small hotel owners, analyze the message given by hotel owner which is this : ${message}\nphone : ${phone}. map this message to one of the following response keywords and the data : 
         
 Register a new user - {intent: register_user, data: {role: either host or customer}}
 View bookigs - view_bookings
 Block rooms for service - {block_room: the_room_number}
 Change hotel room rates - {change_rates: {new_rate: the_provided_rate}}
 Unblock room after service - {unblock_room: the_room_number}
 give analytics for this week - weekly_analytics
 give analytics for this day - daily_analytics
 Add Property - {intent: add_property, data: {name: the_property_name, address?: the_address, locationLink?: google_maps_link}}
 View Properties -  {intent: view_properties}
 Add Room - {intent: add_room, data: {name: the_room_name, property_name: the_property_name, price: room_price}}. 
 View rooms - {intent: view_rooms, data: {property_name: the_property_name}} . 
 Nothing matches : {intent: unrecognized}




response should be json in the format : 
{
    intent: the_keyword eg: view_bookings,
    data? : the data if applicable
}

`;
