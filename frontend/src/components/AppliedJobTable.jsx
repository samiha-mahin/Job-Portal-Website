import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>17-7-25</TableCell>
                            <TableCell>Frontend developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right"><Badge className="bg-green-500">Selected</Badge></TableCell>
                        </TableRow>
                            
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable