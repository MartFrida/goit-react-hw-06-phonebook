import { StyledButton, StyledInput } from "components/Phonebook/Phonebook.styled"
import React, { useState } from "react";
import { StyledContactForm } from "./ContactForm.styled";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

const INITIAL_STATE = {
  name: '',
  number: '',
}

export const ContactForm = ({ onAddContact }) => {
  const [formState, setFormState] = useState(INITIAL_STATE)
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactsData.contacts);

  const handleChangeInput = e => {
    const { target } = e;
    const { name, value } = target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitAddUser = (e) => {
    e.preventDefault();
    onAddContact(formState);
    setFormState(INITIAL_STATE)
  }

  const { name, number } = formState;
  return (
    <StyledContactForm onSubmit={handleSubmitAddUser} >
      <StyledInput name="name" value={name} onChange={handleChangeInput} placeholder="Enter name" />
      <StyledInput name='number' value={number} onChange={handleChangeInput} placeholder="Enter phone number" />
      <StyledButton>Add contact</StyledButton>
    </StyledContactForm>
  )
}