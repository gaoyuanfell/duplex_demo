import ws from "ws";
class UserManager {
  private clientMap = new WeakMap<ws, string>();
  private userMap = new Map<string, ws>();

  login(address: string, client: ws) {
    this.userMap.set(address, client);
    this.clientMap.set(client, address);
    console.info(`用户${address}登录成功`);
  }

  logout(address: string) {
    this.userMap.delete(address);
  }
  get(address: string) {
    return this.userMap.get(address);
  }

  getAddress(client: ws) {
    return this.clientMap.get(client);
  }
}

export const userManager = new UserManager();
