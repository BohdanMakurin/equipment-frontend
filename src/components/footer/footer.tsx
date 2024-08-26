import React from "react";
import { Box, Typography } from '@mui/material';
import { IRootState } from "../../store";
import { useSelector } from "react-redux";

const Footer = () => {
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );
    return (
        <>
            {isLoggedIn && (
                <Box
                    sx={{
                        position: 'fixed',      // Фиксированное позиционирование
                        bottom: 0,             // Привязываем футер к нижнему краю окна
                        left: 0,               // Прикрепляем футер к левому краю окна
                        width: '100%',         // Занимает всю ширину экрана
                        backgroundColor: '#000',
                        color: '#fff',
                        py: 2,
                        textAlign: 'center',
                        zIndex: 1000,          // Устанавливаем высокий z-index, чтобы футер был поверх другого содержимого
                    }}
                >
                    <Typography variant="body2">
                        © 2025 Zachodniopomorski Uniwersytet Technologiczny w Szczecinie, All Rights Reserved
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default Footer;
