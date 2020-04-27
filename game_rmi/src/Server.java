import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;
import java.util.Vector;

public class Server extends UnicastRemoteObject implements IVirusWars {

    public  Server() throws RemoteException
    {
        super();
    }
    static Vector<IVirusWars>  clients = new Vector<>();
    private static char field[][];
    private static int missCounter = 0;
    private  int players = 0;
    private static void StartGame() {
        try {
            String mes = "Game is started";
            field = new char[10][10];
            for (int i = 0; i < field.length; i++) {
                for (int j = 0; j < field[0].length; j++) {
                    field[i][j] = 152;
                }
            }
            System.out.println(mes);
            for (int i = 0; i < clients.size(); i++) {
                IVirusWars tmp = clients.get(i);
                tmp.ShowClientMessage("Game is started");
                tmp.Display(field);
            }
            PutVirus(clients.get(0).WaitForTurn(),1);
            clients.get(0).Display(field);
            clients.get(1).Display(field);
            PutVirus(clients.get(1).WaitForTurn(),2);
            clients.get(0).Display(field);
            clients.get(1).Display(field);
            while (true)
            {
                PutVirus(clients.get(0).WaitForTurn(),1);
                clients.get(0).Display(field);
                clients.get(1).Display(field);
                if(IsGameFinished())
                {
                    break;
                }
                PutVirus(clients.get(1).WaitForTurn(),2);
                if(IsGameFinished())
                {
                    break;
                }
                clients.get(0).Display(field);
                clients.get(1).Display(field);
            }
        }catch (RemoteException ex)
        {
            ex.printStackTrace();
        }
    }
    private static  boolean IsGameFinished()
    {
        if(missCounter == 2)
        {
            System.out.println("Game is finished. It is draw");
            return true;
        }
        boolean first = false,second = false;
        for (int i = 0; i < field.length; i++) {
            for (int j = 0; j < field[0].length; j++) {
                if(field[i][j] == 'X')
                {
                    first = true;
                }
                if(field[i][j] == 'O')
                {
                    second = true;
                }
            }
        }
        if(first && second)
        {
            return false;
        }
        else
        {
            try {
                if (first) {
                    System.out.println("Game is finished. Player 1 has won");
                    clients.get(0).ShowClientMessage("Game is finished. Player 1 has won");
                    clients.get(1).ShowClientMessage("Game is finished. Player 1 has won");
                    return true;
                } else {
                    System.out.println("Game is finished. Player 2 has won");
                    clients.get(0).ShowClientMessage("Game is finished. Player 2 has won");
                    clients.get(1).ShowClientMessage("Game is finished. Player 2 has won");
                    return true;
                }
            }catch (RemoteException ex)
            {
                ex.printStackTrace();
                return false;
            }
        }
    }
    private  static  void PutVirus(int[][] turn,int player)
    {
        if(turn != null) {
            missCounter = 0;
            switch (player) {
                case 1:
                    for (int i = 0; i < 3; i++) {
                        if (field[turn[i][0]][turn[i][1]] == 152) {
                            field[turn[i][0]][turn[i][1]] = 'X';
                        }
                        else {
                            field[turn[i][0]][turn[i][1]] = '+';
                        }
                    }
                    break;
                case 2:
                    for (int i = 0; i < 3; i++) {
                        if (field[turn[i][0]][turn[i][1]] == 152) {
                            field[turn[i][0]][turn[i][1]] = 'O';
                        }
                        else {
                            field[turn[i][0]][turn[i][1]] = '•';
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        else
        {
            missCounter++;
        }

    }

    public  static  void main(String[] args) throws Exception
    {
        try {
            IVirusWars service = new Server();
            String serviceName = "ServerService";
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind(serviceName, service);
            System.out.println("Start " + serviceName);
        }catch (RemoteException e) {
            System.err.println("RemoteException : "+e.getMessage());
            System.exit(1);
        } catch (Exception e) {
            System.err.println("Exception : " + e.getMessage());
            System.exit(2);
        }
    }
    @Override
    public void Connect(IVirusWars client)
    {
        try {
        players++;
        if(players < 3)
        {
            client.SetClientNum(players);
            client.ShowClientMessage("Connected player " +  client.GetClientNum());
            clients.add(client);
            System.out.println("Player " + players + " connected");
            if(players  ==  2)
            {
                StartGame();
            }
            return;
        }
        client.ShowClientMessage("No place for new players");
        System.out.println("No place for new players");
        }catch (RemoteException ex)
        {
            ex.printStackTrace();
        }
    }
    @Override
    public void ShowClientMessage(String message)
    {

    }
    @Override
    public  void SetClientNum(int num)
    {
    }
    @Override
    public  int GetClientNum()
    {
        return 0;
    }
    @Override public  void Display(char[][] table)
    {
        System.out.println("  1  2 3 4 5  6 7 8 9 10");
        for(int i = 0; i < field.length; i++)
        {
            System.out.print((char)('A' + i));
            System.out.print(' ');
            for (int j = 0; j < field[0].length; j++)
            {
                System.out.print(field[i][j] + " ");
            }
            System.out.println();
        }
    }
    @Override public int[][] WaitForTurn()
    {
        return null;
    }
}
