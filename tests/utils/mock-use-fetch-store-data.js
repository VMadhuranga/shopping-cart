import { vi } from "vitest";
import * as storeDataModule from "../../src/utils/store-data";

const mockUseFetchStoreData = (data, error, loading) =>
  vi.spyOn(storeDataModule, "default").mockImplementation(() => {
    return { data, error, loading };
  });

export default mockUseFetchStoreData;
