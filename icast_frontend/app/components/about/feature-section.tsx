import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Secure Voting",
    description: "State-of-the-art encryption and security measures to protect your votes."
  },
  {
    title: "Easy to Use",
    description: "Intuitive interface for both voters and election administrators."
  },
  {
    title: "Real-time Results",
    description: "Instant vote counting and result visualization."
  },
  {
    title: "Customizable",
    description: "Tailor the voting process to your organization's specific needs."
  }
]

const FeatureSection: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FeatureSection