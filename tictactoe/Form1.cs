using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace tictactoe
{
    public partial class Form1 : Form
    {
        bool turn=true;
        int turn_count=0;
        bool thewinneris = false;
        public Form1()
        {
            InitializeComponent();
        }

        private void helpToolStripMenuItem_Click(object sender, EventArgs e)
        {
          
        }

        private void aboutToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("There is no help :D", "Loko Kisses");
        }

        private void exitGameToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button_click(object sender, EventArgs e)
        {
            turn_count++;
            Button b = (Button)sender;
            if (turn)
                b.Text = "X";
            else
                b.Text = "O";
            
            b.Enabled = false;
            checkForWinner();
            turn = !turn;
            if ((turn_count == 9) && (thewinneris == false)) MessageBox.Show("Remis");

            

        }
        private void checkForWinner()
        {
            
            if ((A1.Text == A2.Text) && (A2.Text == A3.Text)&&(!A1.Enabled)) thewinneris = true;
            if ((B1.Text == B2.Text) && (B2.Text == B3.Text) && (!B1.Enabled)) thewinneris = true;
            if ((C1.Text == C2.Text) && (C2.Text == C3.Text) && (!C1.Enabled)) thewinneris = true;

            if ((A3.Text == B2.Text) && (B2.Text == C1.Text) && (!A3.Enabled)) thewinneris = true;
            if ((A1.Text == B2.Text) && (B2.Text == C3.Text) && (!A1.Enabled)) thewinneris = true;

            if ((A1.Text == B1.Text) && (B1.Text == C1.Text) && (!A1.Enabled)) thewinneris = true;
            if ((A2.Text == B2.Text) && (B2.Text == C2.Text) && (!A2.Enabled)) thewinneris = true;
            if ((A3.Text == B3.Text) && (B3.Text == C3.Text) && (!A3.Enabled)) thewinneris = true;

            if (thewinneris)
            {
                String winner = "";
                if (turn) winner = "X";
                else winner = "O";
                MessageBox.Show(winner+" Wins");
                Application.Exit();
            } 
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Form2 f2 = new Form2();
            f2.ShowDialog();
            //Form2.textBox1.Text = textBox1.Text;
        }
    }
}
