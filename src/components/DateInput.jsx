import React from 'react'

export default function DateInput() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };
  return (
    <div>
      
    </div>
  )
}
