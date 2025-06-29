export const checkIntent = (
  message: string
) => `For a whatsapp chatbot intended for small hotel owners, analyze the message given by hotel owner which is this : ${message}. map this message to one of the following response keywords : 
         
1. View bookigs - view_bookings
2. Block rooms for service - {block_room: the_room_number}
3. Change hotel room rates - {change_rates: {new_rate: the_provided_rate}}
4. Unblock room after service - {unblock_room: the_room_number}
5. give analytics for this week - weekly_analytics
6. give analytics for this day - daily_analytics
7. Unrecognized request - unrecognized

response should be json in the format : 
{
    intent: the_keyword eg: view_bookings
}

`;
