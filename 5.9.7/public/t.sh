#!/bin/bash
for run in {1..100}; do
  nohup npm t &
done
