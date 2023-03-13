describe("updatePlayer", () => {
    it("should update player position correctly", () => {
      const player = {
        pos: { x: 0, y: 0 },
        vel: { x: 1, y: 2 },
        update: function updatePlayer() {
          this.pos.x += this.vel.x;
          this.pos.y += this.vel.y;
        },
      };
  
      player.update();
      expect(player.pos.x).toBe(1);
      expect(player.pos.y).toBe(2);
  
      player.update();
      expect(player.pos.x).toBe(2);
      expect(player.pos.y).toBe(4);
    });
});
  
  
  
  
  