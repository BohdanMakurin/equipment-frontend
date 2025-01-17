import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Company } from '../../../models/models';

interface SelectCompanyDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (companyId: number) => void;
    companies: Company[];
}

const SelectCompanyDialog: React.FC<SelectCompanyDialogProps> = ({ open, onClose, onSelect, companies }) => {
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

    const handleSelect = () => {
        if (selectedCompanyId !== null) {
            onSelect(selectedCompanyId);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Select Company</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel>Company</InputLabel>
                    <Select
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(e.target.value as number)}
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.companyId} value={company.companyId}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSelect} color="primary" disabled={selectedCompanyId === null}>
                    Select
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectCompanyDialog;
