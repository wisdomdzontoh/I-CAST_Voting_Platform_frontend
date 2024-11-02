import React, { useState } from 'react'
import { Input } from "../ui/input"

interface FaqSearchProps {
  onSearch: (searchTerm: string) => void;
}

const FaqSearch: React.FC<FaqSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md"
      />
    </div>
  )
}

export default FaqSearch