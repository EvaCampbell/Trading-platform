import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  IconButton,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const AccountInfoCard = () => {
  const [account, setAccount] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://13.41.72.245/account_details")
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      })
      .catch((error) =>
        console.error("Failed to fetch account details:", error)
      );
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Card sx={{ backgroundColor: "#100E0F", color: "#fff" }}>
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="div">
                Account Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                  color: "#898587",
                }}
              >
                <VisibilityIcon />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Button
                sx={{
                  color: "#898587",
                  borderRight: "1px solid #2F2C2D",
                  padding: "5px",
                }}
                onClick={() => setOpen((open) => !open)}
              >
                <SettingsOutlinedIcon />
              </Button>
              <Box padding={"5px"} sx={{ color: "#898587" }}>
                {!open ? <RemoveOutlinedIcon /> : <ExpandLessIcon />}
              </Box>
            </Box>
          </Box>
          {open && (
            <>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Name:
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.account_name}
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Balance:
                </Typography>
                <Typography variant="h6" component="div">
                  ${account?.balance}
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Equity:
                </Typography>
                <Typography variant="h6" component="div">
                  ${account?.equity}
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Exchange:
                </Typography>
                <Typography variant="h6" component="div">
                  Binance
                </Typography>
              </Box>
              <Box my={"20px"} height={2} bgcolor={"#2c2c2e"}></Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Leverage:
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.leverage}x
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Risk:
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.risk}%
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Daily Loss Limit:
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.daily_loss_limit}%
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Take Profit (RR):
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.take_profit_level}
                </Typography>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Auto BE Level (RR):
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.auto_be_level}
                </Typography>
              </Box>
              <Box my={"20px"} height={2} bgcolor={"#2c2c2e"}></Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  One Click Trade
                </Typography>
                <Switch
                  {...label}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#E74694",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#E74694",
                    },
                  }}
                  defaultChecked
                />
              </Box>
              <Box my={"20px"} height={2} bgcolor={"#2c2c2e"}></Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Show Account on Leaderboard:
                </Typography>
                <Switch
                  {...label}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#E74694",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#E74694",
                    },
                  }}
                  defaultChecked
                />
              </Box>
              <Box my={"20px"} height={2} bgcolor={"#2c2c2e"}></Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Max Lot Sizes:
                </Typography>
                <Typography variant="h6" component="div">
                  {account?.max_lot_sizes}
                </Typography>
                <Box
                  padding={"5px"}
                  border={"1px solid"}
                  borderColor={"#E74694"}
                  borderRadius={"6px"}
                  sx={{
                    display: "flex",
                    justifyContent: "center,",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <AddIcon sx={{ color: "#E74694" }} />
                </Box>
              </Box>
              <Box justifyContent={"space-between"} display={"flex"}>
                <Typography variant="h6" component="div" color={"#898587"}>
                  Account Commissions:
                </Typography>
                {account?.commissions?.length > 0 && (
                  <Box display={"flex"}>
                    <Typography
                      variant="h6"
                      component="div"
                      bgcolor={"#2c2c2e"}
                      padding={"5px"}
                      borderRadius={"6px"}
                      color={"#E74694"}
                    >
                      {account?.commissions?.length ?? 0}
                      <span style={{ color: "#898587" }}> Rules</span>
                    </Typography>
                    <Box
                      padding={"5px"}
                      border={"1px solid"}
                      borderRadius={"6px"}
                      borderColor={"#2c2c2e"}
                      sx={{
                        display: "flex",
                        justifyContent: "center,",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <EditOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                justifyContent={"space-between"}
                display={"flex"}
                marginTop={"5px"}
              >
                <Typography variant="h6" component="div" color={"#898587"}>
                  Symbol Mappings:
                </Typography>
                <Box display={"flex"}>
                  <Typography
                    variant="h6"
                    component="div"
                    bgcolor={"#2c2c2e"}
                    padding={"5px"}
                    borderRadius={"6px"}
                    color={"#E74694"}
                  >
                    {account?.symbolMappings?.length ?? 0}
                    <span style={{ color: "#898587" }}> Rules</span>
                  </Typography>
                  <Box
                    padding={"5px"}
                    border={"1px solid"}
                    borderColor={"#2c2c2e"}
                    borderRadius={"6px"}
                    sx={{
                      display: "flex",
                      justifyContent: "center,",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <EditOutlinedIcon sx={{ color: "#fff" }} />
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountInfoCard;
