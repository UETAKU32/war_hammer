import { Grid } from "@mui/material"
import { FC } from "react"
import TurnInfo from "./TurnInfo"
import VictoryPoints from "./VictoryPoints"

export const GameInfoPanel: FC = () => {
  return (
    <Grid container direction="row" spacing={1}
      marginBottom={4}
      justifyContent="center"
      alignItems="center"
      style={{
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', // 影
        background: 'linear-gradient(to right, rgba(255, 0, 0, 0.2), rgba(0, 0, 255, 0.2))',
      }}
    >
      <Grid direction="column" xs={1}>
      </Grid>
      <Grid direction="column" xs={1}>
      </Grid>
      <Grid direction="column" xs={2}>
        <VictoryPoints playerId={"A"} />
      </Grid>
      <Grid direction="column" xs={4}>
        <TurnInfo />
      </Grid>
      <Grid direction="column" xs={2}>
        <VictoryPoints playerId={"B"} />
      </Grid>
      <Grid direction="column" xs={1}>
      </Grid>
      <Grid direction="column" xs={1}>
      </Grid>
    </Grid>
  )
}