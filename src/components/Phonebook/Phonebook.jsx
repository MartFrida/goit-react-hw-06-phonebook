import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { StyledWrapper } from './Phonebook.styled';
import { FilterUsers } from 'components/FilterUsers/FilterUsers';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const handleAddUser = ({ name, number }) => {
    const isExist = contacts.some((item) => item.name === name)
    if (isExist) {
      alert('ALERT')
      return
    }
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }])
  }

  const handleSetFilter = (e) => {
    setFilter(e.target.value)
  }

  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleDeleteUser = (id) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id))
  }

  useEffect(() => {
    const handleContacts = JSON.parse(window.localStorage.getItem('CONTACTS_DATA'))
    if (handleContacts?.length) {
      setContacts(handleContacts)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('CONTACTS_DATA', JSON.stringify(contacts))
  }, [contacts])


  return (
    <StyledWrapper >

      <h2>Phonebook</h2>
      <ContactForm onAddContact={handleAddUser} />
      <h2>Contacts</h2>
      <FilterUsers filter={filter} handleChangeInput={handleSetFilter} />
      <ContactList filteredContacts={getFilteredContacts()} onDeleteUser={handleDeleteUser} />

    </StyledWrapper>
  )
}