import React from 'react'
import { Card, CardContent, CardFooter } from "../ui/card"

interface TestimonialCardProps {
  quote: string;
  author: string;
  organization: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, organization }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-lg italic">"{quote}"</p>
      </CardContent>
      <CardFooter>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{organization}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard