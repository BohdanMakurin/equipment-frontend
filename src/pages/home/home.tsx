import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { logoutUser } from "../../store/auth/actionCreators";
import { IRootState } from "../../store";
import { Card, CardContent, Grid, Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MonitorIcon from '@mui/icons-material/Monitor'; // Иконка для "Equipment"
import PersonIcon from '@mui/icons-material/Person';   // Иконка для "Workers"
import FactoryIcon from '@mui/icons-material/Factory'; // Иконка для "Companies"

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: IRootState) => state.auth.profileData.profile);

  const cards = [
    { title: "Equipment", path: "/equipment", description: "Manage equipment", icon: <MonitorIcon sx={{ fontSize: 150, color: '#1976D2'}} /> },
    { title: "Workers", path: "/workers", description: "Manage workers", icon: <PersonIcon sx={{ fontSize: 150, color: '#1976D2'}} /> },
    { title: "Companies", path: "/companies", description: "Manage companies", icon: <FactoryIcon sx={{ fontSize: 150, color: '#1976D2'}} /> }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
          Welcome to Eq
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card sx={{ maxWidth: 345, margin: '0 auto', textAlign: 'center', padding: 2 }}>
              <Link to={card.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2}}>
                  {card.icon}
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
