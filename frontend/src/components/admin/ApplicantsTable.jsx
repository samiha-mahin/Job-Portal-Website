import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';


const shortListingStatus = ["Accepted","Rejected"];

const ApplicantsTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    <tr>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell></TableCell>
                    </tr>
                </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantsTable