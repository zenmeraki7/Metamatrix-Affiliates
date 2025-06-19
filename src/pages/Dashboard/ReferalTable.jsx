import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import './ReferalTable.css';

function ReferalTable({ referrals }) {
  return (
    <>
       <div className="referral-table-container">
           <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Referral List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>#</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Referral Code</strong></TableCell>
            <TableCell><strong>Joined On</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals?.length > 0 ? (
            referrals.map((ref, index) => (
              <TableRow key={ref.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ref.name}</TableCell>
                <TableCell>{ref.email}</TableCell>
                <TableCell>{ref.code}</TableCell>
                <TableCell>{new Date(ref.joinedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No referrals found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
       </div>
    </>
  )
}

export default ReferalTable