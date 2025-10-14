import React from 'react'
import styled from '@emotion/styled'

interface ActionItem {
    task: string
    assignee: string
    deadline: string
}

interface ActionListProps {
    items: ActionItem[]
}

const ActionList: React.FC<ActionListProps> = ({ items }) => {
    return (
        <Container>
            {items.map((item, index) => (
                <ActionCard key={index}>
                    <Task>{item.task}</Task>
                    <Detail>
                        <strong>Assignee:</strong> {item.assignee}
                    </Detail>
                    <Detail>
                        <strong>Deadline:</strong> {item.deadline}
                    </Detail>
                </ActionCard>
            ))}
        </Container>
    )
}

export default ActionList

// 💅 Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
`

const ActionCard = styled.div`
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    transition: 0.2s ease;
    &:hover {
        background-color: #f3f4f6;
    }
`

const Task = styled.h3`
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    color: #111827;
`

const Detail = styled.p`
    margin: 0.25rem 0;
    color: #4b5563;
`
