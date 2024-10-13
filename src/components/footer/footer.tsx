import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { IRootState } from "../../store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const [footerPosition, setFooterPosition] = useState<'fixed' | 'relative'>('relative');
  const location = useLocation(); // Хук для получения текущего пути

  useEffect(() => {
    const checkHeight = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setFooterPosition('fixed');
      } else {
        setFooterPosition('relative');
      }
    };

    checkHeight(); // Проверка при первом рендере

    window.addEventListener('resize', checkHeight); // Обновление при изменении размера окна

    return () => {
      window.removeEventListener('resize', checkHeight); // Удаляем слушатель при размонтировании
    };
  }, [location]); // Зависимость от location для проверки при каждом переходе на новую страницу

  return (
    <>
      {isLoggedIn && (
        <Box
          sx={{
            position: footerPosition,   // Меняем позицию в зависимости от состояния
            bottom: footerPosition === 'fixed' ? 0 : 'auto',  // При fixed — прикрепляем к низу экрана
            left: 0,
            width: '100%',
            backgroundColor: '#000',
            color: '#fff',
            py: 2,
            mt: 4,
            textAlign: 'center',
            zIndex: 1000,
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
