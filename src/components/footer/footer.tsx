import React from "react";
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                position: 'fixed',   // Фиксированное позиционирование
                bottom: 0,           // Фиксируем футер к нижнему краю окна просмотра
                left: 0,             // Прикрепляем футер к левому краю окна просмотра
                width: '100%',       // Занимает всю ширину экрана
                backgroundColor: '#000',
                color: '#fff',
                py: 2,
                textAlign: 'center',
                top: 'auto',         // Устанавливаем top в 'auto', чтобы избежать конфликта с bottom
                zIndex: 1000,        // Устанавливаем высокий z-index, чтобы футер был поверх другого содержимого
            }}
        >
            <Typography variant="body2">
                © 2025 Zachodniopomorski Uniwersytet Technologiczny w Szczecinie, All Rights Reserved
            </Typography>
        </Box>
    );
};

export default Footer;